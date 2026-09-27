import { Module } from "@nestjs/common";
import { OpenaiService } from "./openai.service";
import { ChatOpenAI } from "@langchain/openai";
import { OpenaiController } from "./openai.controller";

@Module({
  controllers: [OpenaiController],
  providers: [
    OpenaiService,
    {
      provide: "OPENAI_CHAT_MODEL",
      useFactory: () => {
        return new ChatOpenAI({
          modelName: "deepseek-v4-pro",
          apiKey: "sk-a9026b46f774406aacbcb68f6edaa74f",
          configuration: {
            baseURL: "https://api.deepseek.com"
          }
        });
      }
    }
  ],
  exports: [OpenaiService]
})
export class OpenaiModule {}
