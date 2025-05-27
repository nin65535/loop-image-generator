export function replaceExtension(filename: string, newExt: string): string {
    const lastDotIndex = filename.lastIndexOf(".");
    if (lastDotIndex === -1) {
        // 拡張子がない場合、末尾に追加
        return filename + newExt;
    }
    return filename.substring(0, lastDotIndex) + newExt;
}