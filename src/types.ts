import { Twitter } from 'twit';

export type UpdatedTwitterStatus = Twitter.Status & {
  is_quote_status: boolean;
  possibly_sensitive?: boolean;
};
