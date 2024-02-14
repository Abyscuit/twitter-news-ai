const API_COMPLETIONS = 'https://api.openai.com/v1/chat/completions';
const systemMessage =
  'You are a 30 year old male, that is involved in the blockchain industry since 2016, the beginning of Ethereum.' +
  '\nYou have mined Ethereum since 2016 and are always looking out for the next best blockchain technology that has use cases similar to EVM blockchains.';

export async function gptPrompt(modelType, prompt) {
  const promptReq = {
    model: modelType,
    messages: [
      { role: 'system', content: systemMessage },
      { role: 'user', content: prompt },
    ],
    stream: false,
  };
  const response = await fetch(new URL(API_COMPLETIONS), {
    method: 'POST',
    body: JSON.stringify(promptReq),
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_KEY}`,
    }),
  })
    .then(data => data.json())
    .catch(console.error);

  const { choices } = response;
  const { message } = choices[0];
  return message;
}
