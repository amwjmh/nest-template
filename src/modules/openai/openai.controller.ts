import { Controller, Post, Body, Query, Inject, Sse, Get, Header } from "@nestjs/common";
import { OpenaiService } from "./openai.service";
import { ChatOpenAI } from "@langchain/openai";
import { AIMessageChunk } from "@langchain/core/messages";
import { ApiTags, ApiOperation, ApiBody, ApiQuery } from "@nestjs/swagger";
import { from } from "rxjs";
import { map } from "rxjs/operators";

@ApiTags("OpenAI")
@Controller("/api/openai")
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService, @Inject("OPENAI_CHAT_MODEL") private readonly chatModel: ChatOpenAI) {
  }
  @Post("/chat")
  @ApiOperation({ summary: "与OpenAI模型对话" })
  async chat(@Body() body: { message: string }) {
    return await this.chatModel.invoke(body.message);
  }
  @Sse("/chat-stream")
  @ApiOperation({ summary: "与OpenAI模型对话（流式）" })
  @ApiQuery({ name: "message", description: "提问内容", type: String })
  @Header("Access-Control-Allow-Origin", "*")
  async chatStream(@Query("message") message: string) {
    const stream = await this.chatModel.stream(message);
    return from(stream as AsyncIterable<AIMessageChunk>).pipe(
      map((chunk) => ({
        data: typeof chunk.content === "string" ? chunk.content : JSON.stringify(chunk.content)
      }))
    );
  }
}
