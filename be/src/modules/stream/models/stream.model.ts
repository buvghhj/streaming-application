import { Stream } from "@/prisma/generated";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserModel } from "../../auth/account/models/user.models";
import { CategoryModel } from "../../category/models/category.model";
import { ChatModel } from "../../chat/models/chat.model";

@ObjectType()
export class StreamModel implements Stream {

    @Field(() => ID)
    public id: string

    @Field(() => String)
    public title: string

    @Field(() => String, { nullable: true })
    public thumbnailUrl: string

    @Field(() => String, { nullable: true })
    public ingressId: string

    @Field(() => String, { nullable: true })
    public serverUrl: string

    @Field(() => String, { nullable: true })
    public streamKey: string

    @Field(() => Boolean)
    public isLive: boolean

    @Field(() => Boolean)
    public isChatEnabled: boolean

    @Field(() => Boolean)
    public isChatFollowersOnly: boolean

    @Field(() => Boolean)
    public isChatPremiumFollowersOnly: boolean

    @Field(() => UserModel)
    public user: UserModel

    @Field(() => String)
    public userId: string

    @Field(() => CategoryModel)
    public category: CategoryModel

    @Field(() => String)
    public categoryId: string

    @Field(() => [ChatModel])
    public chatMessages: ChatModel

    @Field(() => Date)
    public createdAt: Date

    @Field(() => Date)
    public updatedAt: Date

}