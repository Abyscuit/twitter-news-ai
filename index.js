import dotenv from 'dotenv';
import { gptPrompt } from './handlers/gpt.js';
import { searchByTopic } from './handlers/news.js';

dotenv.config();

async function getAIResponse() {
  const response = await gptPrompt('gpt-4', 'Hello, who are you?');
  console.log('AI Response:', response);
}

async function summarizeContent(content) {
  const response = await gptPrompt(
    'gpt-4',
    `Please summarize the following:\n${content}`
  );
  console.log('AI Summary:', response);
}

async function getArticles(topic) {
  const { status, totalResults, articles } = await searchByTopic(topic);

  if (status !== 'ok' || totalResults === 0) return;

  for (let i = 0; i < articles.length - 1; i++) {
    const { title, content, description } = articles[i];
    console.log(`Article ${i + 1}: ${title} - ${description} - ${content}\n`);
  }
}
getArticles('Ethereum');
// getAIResponse();
// summarizeContent();
