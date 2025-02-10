export const OPENAI_MODELS = [
	'dall-e-2',
	'o1-mini-2024-09-12',
	'o1-preview-2024-09-12',
	'o1-mini',
	'o1-preview',
	'whisper-1',
	'babbage-002',
	'omni-moderation-latest',
	'omni-moderation-2024-09-26',
	'tts-1-hd-1106',
	'tts-1-hd',
	'dall-e-3',
	'tts-1',
	'gpt-3.5-turbo-16k',
	'tts-1-1106',
	'davinci-002',
	'gpt-4o-mini-2024-07-18',
	'gpt-4o-mini',
	'gpt-3.5-turbo-instruct',
	'gpt-3.5-turbo-instruct-0914',
	'gpt-3.5-turbo-0125',
	'gpt-3.5-turbo',
	'text-embedding-3-large',
	'text-embedding-ada-002'
] as const;

export type OpenAiModels = (typeof OPENAI_MODELS)[number];

export type Models = OpenAiModels;