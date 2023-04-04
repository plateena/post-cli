export function generateTitle(title: string): void {
    const lineBreakLine = "=========================================================="
    console.log('-'.repeat(lineBreakLine.length) + '-'.repeat(title.length) + '-'.repeat(lineBreakLine.length));
    console.log(lineBreakLine + title + lineBreakLine)
    console.log('-'.repeat(lineBreakLine.length) + '-'.repeat(title.length) + '-'.repeat(lineBreakLine.length));

}
