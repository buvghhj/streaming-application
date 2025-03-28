import { PrismaService } from '@/src/core/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@/prisma/generated';
import { CreateIngressOptions, IngressAudioEncodingPreset, IngressInput, IngressVideoEncodingPreset } from 'livekit-server-sdk';
import { LivekitService } from '@/src/modules/libs/livekit/livekit.service';

@Injectable()
export class IngressService {

    public constructor(
        private readonly prismaService: PrismaService,
        private readonly livekitService: LivekitService
    ) { }

    //Tạo keys cho stream
    public async create(user: User, ingressType: IngressInput) {

        await this.resetIngress(user)

        const options: CreateIngressOptions = {

            name: user.username,

            roomName: user.id,

            participantName: user.username,

            participantIdentity: user.id

        }

        if (ingressType === IngressInput.WHIP_INPUT) {

            options.bypassTranscoding = true

        } else {

            options.video = {

                source: 1,

                preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS

            }

            options.audio = {

                source: 2,

                preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS

            }

        }

        const ingress = await this.livekitService.ingress.createIngress(ingressType, options)

        if (!ingress || !ingress.url || !ingress.streamKey) {

            throw new BadRequestException('Không thể tạo luồng đầu vào!')

        }

        await this.prismaService.stream.update({

            where: {

                userId: user.id

            },
            data: {

                ingressId: ingress.ingressId,

                serverUrl: ingress.url,

                streamKey: ingress.streamKey

            }

        })

        return true

    }

    private async resetIngress(user: User) {

        const ingresses = await this.livekitService.ingress.listIngress({

            roomName: user.id

        })

        const rooms = await this.livekitService.room.listRooms([user.id])

        for (const room of rooms) {

            await this.livekitService.room.deleteRoom(room.name)

        }

        for (const ingress of ingresses) {

            if (ingress.ingressId) {

                try {

                    await this.livekitService.ingress.deleteIngress(ingress.ingressId)

                } catch (error) {

                    console.error(`Lỗi khi xóa dữ liệu nhập ${ingress.ingressId}:`, error)

                }

            }

        }

    }

}
