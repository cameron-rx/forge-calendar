using System.Security.Claims;
using System.Text.Json;
using dotenv.net;
using OpenAI.Chat;
public static class ForgeEndpoints
{
    public static void MapForgeEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/forge").RequireAuthorization();

        group.MapPost("/", async (ForgeRequestDTO request, ITimeBlockService timeBlockService, ClaimsPrincipal user) =>
        {
            var userId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null) return Results.Unauthorized();

            var systemPrompt = $"""
            You are an agent responsible for parsing a users text input and creating calendar events based on its content to be placed
            in their personal calendar. If 24 hour time is not specifically given infer from the type of activity. Response date strings must be in iso format as a UTC date. Todays date is {DateTime.Now.ToLongDateString()}
            Events can be past or present.
            The user is in a timezone with an offset of {request.TimeOffset} in minutes from utc.
            If you cannot interpret any events return an empty array.
            """;

            Console.WriteLine(systemPrompt);

            DotEnv.Load();
            ChatClient client = new("gpt-4.1-nano", Environment.GetEnvironmentVariable("OPENAI_API_KEY"));

            List<ChatMessage> messages = [new SystemChatMessage(systemPrompt), new UserChatMessage(request.Message)];

            ChatCompletionOptions options = new()
            {
                ResponseFormat = ChatResponseFormat.CreateJsonSchemaFormat(
               jsonSchemaFormatName: "calendar_event",
               jsonSchema: BinaryData.FromBytes("""
                    {
                        "type": "object",
                        "additionalProperties": false,
                        "required": [
                            "Name",
                            "Location",
                            "StartTime",
                            "EndTime"
                        ],
                        "properties": {
                            "Name": {
                                "type": "string",
                                "description": "Name of calendar event"
                            },
                            "Location": {
                                "type": "string",
                                "description": "Where the event takes place"
                            },
                            "StartTime": {
                                "type": "string",
                                "description": "DateTime when the event starts"
                            },
                            "EndTime": {
                                "type": "string",
                                "description": "DateTime when the event ends"
                            }
                        }
                    }
                    """u8.ToArray()),
               jsonSchemaIsStrict: true)
            };

            ChatCompletion completion = await client.CompleteChatAsync(messages, options);

            using JsonDocument structuredJson = JsonDocument.Parse(completion.Content[0].Text);
            var rootElement = structuredJson.RootElement;

            Console.WriteLine($"Name: {rootElement.GetProperty("Name")}");
            Console.WriteLine($"Location: {rootElement.GetProperty("Location")}");
            Console.WriteLine($"StartTime: {rootElement.GetProperty("StartTime")}");
            Console.WriteLine($"EndTime: {rootElement.GetProperty("EndTime")}");

            TimeBlockRequestDTO timeblockDTO = new()
            {
                Name = rootElement.GetProperty("Name").GetString(),
                Location = rootElement.GetProperty("Location").GetString(),
                StartTime = rootElement.GetProperty("StartTime").GetDateTime(),
                EndTime = rootElement.GetProperty("EndTime").GetDateTime()
            };

            try
            {
                var timeblock = await timeBlockService.Create(timeblockDTO, userId);
                return Results.Created($"/timeblock/{timeblock.Id}", timeblock);
            }
            catch (System.Exception exception)
            {
                return Results.Conflict(new
                {
                    error = "Conflicting Timeblocks",
                    message = exception.Message
                });
            }
        });
    }
}
