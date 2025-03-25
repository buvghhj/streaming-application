import { Transaction, TransactionStatus } from "@/prisma/generated";
import { UserModel } from "@/src/modules/auth/account/models/user.models";
import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";

registerEnumType(TransactionStatus, {
    name: 'TransactionStatus'
})

@ObjectType()
export class TransactionModel implements Transaction {

    @Field(() => ID)
    public id: string

    @Field(() => Number)
    public amount: number

    @Field(() => String)
    public currency: string

    @Field(() => String, { nullable: true })
    public stripeSubscriptionId: string

    @Field(() => TransactionStatus)
    public status: TransactionStatus

    @Field(() => UserModel)
    public user: UserModel

    @Field(() => String)
    public userId: string

    @Field(() => Date)
    public createdAt: Date

    @Field(() => Date)
    public updatedAt: Date

}