import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";
import { createAgent, tool } from "langchain";
import rl from "readline/promises";
import * as z from "zod";

dotenv.config();

const events = [];

const createEventTool = tool(
  async function ({ date, title, description }) {
    console.log("Creating event:", { date, title, description });

    events.push({
      date,
      title,
      description,
    });
    return "Event created";
  },
  {
    name: "createEvent",
    description: "Creates a new event with a date, title, and description",
    schema: z.object({
      date: z.string(),
      title: z.string(),
      description: z.string(),
    }),
  },
);

const getEventsTool = tool(
  async function ({}) {
    console.log("Retrieving events:", events);
    return events;
  },
  {
    name: "getEvents",
    description: "Retrieves all events",
    schema: z.object({}),
  },
);

const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatGroq({
  model: "openai/gpt-oss-120b",
  apiKey: process.env.GROQ_API_KEY,
});

// const messages = [];

const agent = createAgent({
  model,
  tools: [createEventTool, getEventsTool],
});

while (true) {
  const userInput = await readline.question("Enter your input: ");

  // messages.push({
  //   role: "user",
  //   content: userInput,
  // });

  // const stream = await model.stream(messages);

  const stream = await agent.stream(
    {
      messages: [
        {
          role: "user",
          content: userInput,
        },
      ],
    },
    { streamMode: "messages" },
  );

  // const aiMessage = "";

  for await (const [chunk] of stream) {
    process.stdout.write(chunk.content);
  }

  // for await (const chunk of stream) {
  //   aiMessage += chunk.messages;
  //   process.stdout.write(chunk.content);
  // }

  // messages.push({
  //   role: "assistant",
  //   content: aiMessage,
  // });

  process.stdout.write("\n");
}
