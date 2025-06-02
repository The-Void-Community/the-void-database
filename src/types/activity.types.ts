export interface ConstantsTypes {
  THEVOIDSBOT_REVERSE_GENDER: string;
  THEVOIDSBOT_NREVERSE: string;
  THEVOIDSBOT_REVERSE: string;
  THEVOIDSBOT_LOVE: string;
  THEVOIDSBOT_REVERSE_LOVE: string;
  THEVOID_LOVE: string;
  THEVOID: string;
  typend_A: string;
  typend_B: string;
  version: string;
}

export interface Activity {
  text: string;
  type: "custom" | "listening" | "playing" | "watching";
}
