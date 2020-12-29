interface Id {
  id: number;
  id_str: string;
  created_at: string;
}

interface Name {
  screen_name: string;
  name: string;
}

interface Description {
  urls: Url[];
}

interface Url {
  url: string;
  expanded_url: string;
  display_url: string;
  indices: number[];
}

declare interface TwitterUserFavorite extends Quotedstatus {
  extended_entities: Extendedentities;
  quoted_status_id: number;
  quoted_status_id_str: string;
  quoted_status: Quotedstatus;
}

declare interface TwitterUser extends Id, Name {
  name: string;
  screen_name: string;
  location: string;
  profile_location?: any;
  description: string;
  url?: any;
  entities: Entities;
  protected: boolean;
  followers_count: number;
  friends_count: number;
  listed_count: number;
  favourites_count: number;
  utc_offset?: any;
  time_zone?: any;
  geo_enabled: boolean;
  verified: boolean;
  statuses_count: number;
  lang?: any;
  status: Retweetedstatus;
  contributors_enabled: boolean;
  is_translator: boolean;
  is_translation_enabled: boolean;
  profile_background_color: string;
  profile_background_image_url: string;
  profile_background_image_url_https: string;
  profile_background_tile: boolean;
  profile_image_url: string;
  profile_image_url_https: string;
  profile_banner_url: string;
  profile_link_color: string;
  profile_sidebar_border_color: string;
  profile_sidebar_fill_color: string;
  profile_text_color: string;
  profile_use_background_image: boolean;
  has_extended_profile: boolean;
  default_profile: boolean;
  default_profile_image: boolean;
  following: boolean;
  follow_request_sent: boolean;
  notifications: boolean;
  translator_type: string;
  suspended: boolean;
  needs_phone_verification: boolean;
}

interface Status extends Id {
  text: string;
  truncated: boolean;
  entities: StatusEntities;
  source: string;
  in_reply_to_status_id?: any;
  in_reply_to_status_id_str?: any;
  in_reply_to_user_id?: any;
  in_reply_to_user_id_str?: any;
  in_reply_to_screen_name?: any;
  geo?: any;
  coordinates?: any;
  place?: any;
  contributors?: any;
  is_quote_status: boolean;
  retweet_count: number;
  favorite_count: number;
  favorited: boolean;
  retweeted: boolean;
  possibly_sensitive: boolean;
  lang: string;
}

interface Retweetedstatus extends Status {
  retweeted_status: Status;
}

interface StatusEntities extends Description {
  hashtags: any[];
  symbols: any[];
  user_mentions: Usermention[];
}

interface Usermention extends Id, Name {
  indices: number[];
}

interface Entities {
  description: Description;
}

interface Quotedstatus extends Status {
  user: TwitterUser;
}

interface Extendedentities {
  media: Media[];
}

interface Entities extends Description {
  hashtags: any[];
  symbols: any[];
  user_mentions: any[];
  media: Media[];
}

interface Media extends Id, Url {
  media_url: string;
  media_url_https: string;
  type: string;
  sizes: Sizes;
}

interface Sizes {
  small: Size;
  thumb: Size;
  large: Size;
  medium: Size;
}

interface Size {
  w: number;
  h: number;
  resize: string;
}
