import { Controller, Get, Render } from "@nestjs/common"
import { AppService } from "./app.service"

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    @Render("index")
    root(): { message: string; lessonName: string } {
        return {
            message: this.appService.getHello(),
            lessonName: "hw_7_docker",
        }
    }
}
