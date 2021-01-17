import { SlackChannelState } from '../../redux/modules/types';

export function searchChannelByString(
  searchString: string,
  target: SlackChannelState[]
) {
  return target.filter((channel) => channel.name.match(searchString));
}
