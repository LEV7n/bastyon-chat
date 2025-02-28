import { mapState } from "vuex";
import chatIcon from "@/components/chats/assets/icon.vue";
export default {
	data: () => ({
		pubChat: Object,
		topicTxt: "",
		topic: false,
		userImagebase64: null,
	}),
	props: {
		chat: Object,
		saveClicked: false,
	},

	components: {
		chatIcon,
	},
	computed: mapState({
		pocketnet: (state) => state.pocketnet,
		minimized: (state) => state.minimized,
		active: (state) => state.active,
		auth: (state) => state.auth,
		m_chat: function () {
			return this.core.mtrx.client.getRoom(this.chat.roomId);
		},
		shareRoomLink: function () {
			return `https://${
				this.core.domain
			}/publicPreview/welcome?connect=${this.chat.roomId.replace("!", "%")}`;
		},
	}),
	mounted() {
		const avatar =
			this.m_chat.currentState.getStateEvents("m.room.avatar")[0]?.event.content
				.avatarUrl;
		this.userImagebase64 = avatar !== "" ? avatar : null;
		if (this.m_chat.getJoinRule() === "public") {
			this.getPublicRoom();
			this.topic = true;
		}
	},
	methods: {
		saveEdited() {
			this.core.mtrx.client.setRoomAvatarUrl(
				this.m_chat.roomId,
				this.userImagebase64
				// "https://n1s1.hsmedia.ru/00/07/3b/00073b44cbcc628624197c16b01a91a0/728x1294_1_2052739535b7028fbe538a7278ecd7c8@1152x2048_0xac120003_19331758041591010989.jpg"
			);
			this.core.mtrx.client.setRoomName(
				this.m_chat.roomId,
				"@" + this.m_chat.name.replace(/[@]*/g, "")
			);
			this.core.mtrx.client
				.setRoomTopic(this.chat.roomId, this.topicTxt.replace(/ /g, "_"))
				.then((r) => {
					return r;
				});
		},
		getPublicRoom() {
			this.core.mtrx.client.publicRooms().then((r) => {
				this.pubChat = r.chunk.filter(
					(room) => room.room_id === this.chat.roomId
				)[0];
				if (this.pubChat["topic"]) {
					this.topicTxt = this.pubChat["topic"].replace(/_/g, " ");
				}
			});
		},
		handleImage(e) {
			const selectedImage = e.target.files[0];
			this.createBase64Image(selectedImage);
		},
		createBase64Image(FileObject) {
			const reader = new FileReader();
			reader.onload = (event) => {
				this.userImagebase64 = event.target.result;
			};
			reader.readAsDataURL(FileObject);
		},
	},
};
