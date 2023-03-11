// TODO: use some library or update target to support string.replaceAll()
function replaceAll(text: string, find: string, replace: string): string {
  let result;
  try {
    result = text.replace(new RegExp(find, 'g'), replace);
  } catch (error) {
    result = text; // For text with ~\./ symbols RegExp may generate the exception
  }
  return result;
}
