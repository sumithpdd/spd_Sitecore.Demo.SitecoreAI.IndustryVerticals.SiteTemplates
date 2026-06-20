// Extracts the media URL from a Sitecore rendering parameter string
export function extractMediaUrl(param: string | undefined): string | undefined {
  if (!param) return undefined;

  const mediaUrlPattern = /mediaurl="([^"]*)"/i;
  const mediaUrlMatch = param.match(mediaUrlPattern);
  if (mediaUrlMatch?.[1]) return mediaUrlMatch[1];

  const srcPattern = /src="([^"]*)"/i;
  const srcMatch = param.match(srcPattern);
  if (srcMatch?.[1]) return srcMatch[1];

  return undefined;
}
