import { Module } from "@nestjs/common";
import { IssService } from "src/iss/iss.service";
import { IssWatcherGateway } from "./iss-watcher.gateway";

@Module({
    imports: [
        IssService,
    ],
    providers: [IssWatcherGateway]
})
export class IssModule { }
