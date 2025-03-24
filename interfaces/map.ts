export interface IGeometry {
  location: {
    lat: number;
    lng: number;
  };
  viewport: {
    northeast: {
      lat: number;
      lng: number;
    };
    southwest: {
      lat: number;
      lng: number;
    };
  };
}

export interface IPhoto {
  height: number;
  width: number;
  photo_reference: string;
  html_attributions: string[];
}

export interface IOpeningHours {
  open_now: boolean;
  periods?: {
    open: {
      day: number;
      time: string;
    };
    close: {
      day: number;
      time: string;
    };
  }[];
  weekday_text?: string[];
}

export interface IPlusCode {
  compound_code: string;
  global_code: string;
}

export interface IPlace {
  business_status: "OPERATIONAL" | "CLOSED_TEMPORARILY" | "CLOSED_PERMANENTLY";
  formatted_address: string;
  geometry: IGeometry;
  icon: string;
  icon_background_color: string;
  icon_mask_base_uri: string;
  name: string;
  opening_hours?: IOpeningHours;
  photos?: IPhoto[];
  place_id: string;
  plus_code?: IPlusCode;
  rating?: number;
  reference: string;
  types: string[];
  user_ratings_total?: number;
  // Additional optional fields that might be present
  website?: string;
  international_phone_number?: string;
  price_level?: 0 | 1 | 2 | 3 | 4;
  vicinity?: string;
}
