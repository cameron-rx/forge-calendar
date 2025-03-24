export default function DayContainer() {
    return (
        <>
            {[...Array(24)].map((_, i) =>
                // Creating dividers for hours in calendar, calculating top position based on index
                <div key={i} className="relative w-full border" style={{ top: (((i+1) / 25) * 100) + "%" }}></div>
            )}
        </>
    )
}