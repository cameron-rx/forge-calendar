export default function DayContainer() {
    return (
        <>
            {[...Array(23)].map((_, i) =>
                // Creating dividers for hours in calendar, calculating top position based on index
                <div className="relative w-full border" style={{ top: (((i + 1) / 24) * 100) + "%" }}></div>
            )}
        </>
    )
}