const wallpapers: string[] = [];

function createWallpaperList(files: number) {
  for (let index = 1; index <= files; index++) {
    wallpapers.push(`wallpaper-${index}.jpg`);
  }
}
createWallpaperList(18);
// console.log(wallpapers);

export default wallpapers;
