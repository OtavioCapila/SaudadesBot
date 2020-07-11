import { Twitter } from 'twit';

/**
 * Since twit library is outdated, i had to create this custom type;
 * I've opened an PR to fix that https://github.com/DefinitelyTyped/DefinitelyTyped/pull/45854
 */
export type UpdatedTwitterStatus = Twitter.Status & {
  is_quote_status: boolean;
};
