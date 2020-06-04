const reformatAlignments = baseAlignments => (
    baseAlignments.filter(([text]) => text[0] !== '!').map(
        ([text, [start, end]]) => ({
            id: text + String(start) + '-' + String(end),
            startText: text,
            word: text,
            start, end
        })
    )
)

export default reformatAlignments