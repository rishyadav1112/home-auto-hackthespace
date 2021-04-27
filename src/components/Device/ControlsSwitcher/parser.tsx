import { SpeechSegment } from "@speechly/react-client";

export enum IntentType {
  Unknown = "unknown",
  turn_on = "turn_on",
  turn_off = "turn_off",

}

export enum EntityType {
  device = "device",
  room = "room",
}



const SpeechIntentValues = Object.values(IntentType) as string[];


export function parseIntent(segment: SpeechSegment): IntentType {
  const { intent } = segment;

  if (SpeechIntentValues.includes(intent.intent)) {
    return intent.intent as IntentType;
  }

  return IntentType.Unknown;
}

export function parseLanguageEntity(segment: SpeechSegment): string[] {
  const device: string[] = [];

  for (const d of segment.entities) {
    if (d.type === EntityType.device) {
      device.push(d.value.toLowerCase());
    }
  }

  return device;
}

