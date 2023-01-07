export function replaceSlackExpression(message: string) {
  // See Slack API doc: https://api.slack.com/reference/surfaces/formatting#escaping
  const table = [
    ['&lt;', '<'],
    ['&gt;', '>'],
    ['&amp;', '&'],
  ];
  let result = message;
  table.forEach((pair) => {
    result = result.replace(pair[0], pair[1]);
  });
  return result;
}
