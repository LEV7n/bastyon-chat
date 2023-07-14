<template>
	<div class="aboutRoomAvatar" v-if="users.length > 1">
		<div class="small" v-if="users.length < 5">
			<div
				class="userinfopicwrapper"
				:class="{
					twoAvatars: users.length === 2,
					threeAvatars: users.length === 3,
					fourAvatars: users.length === 4,
				}"
			>
				<div class="userwrapper" v-for="(user, i) in users">
					<userpic :status="status[user.id]" :userinfo="user" />
				</div>
			</div>
		</div>

		<div class="manyavatars" v-else>
			<div class="useravatar" v-for="(user, i) in users">
				<userpic :status="status[user.id]" :userinfo="user" />
			</div>

		</div>

		<div class="showmore" v-if="chunks">
			<button
				class="small button rounded"
				v-if="users.length < userinfo.length"
				@click="showMore"
			>Show more</button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		userinfo: Array,
		slidesPerView: Number,
		status: {
			type: Object,
			default: {},
		},
		chunks: {
			type: Number,
			default: 0
		}
	},

	data: function () {
		return {
			chunk: 0,
			users: []
		};
	},

	methods: {
		showMore() {
			if (this.users.length >= this.userinfo.length) return;

			const next = this.chunk * this.chunks;

			this.users = this.users.concat(
				this.userinfo.slice(next, next + this.chunks)
			);

			this.chunk++;
		}
	},

	mounted() {
		if (this.chunks) this.showMore();
		else this.users = this.userinfo;
	}
};
</script>
<style lang="sass" scoped>
.manyavatars
	display: flex
	justify-content: center
	align-items: center
	flex-wrap: wrap
	.useravatar
		margin: 0.25 * $r
		width: 44px
		height: 44px

.swiperWrapper
	padding-bottom: 0
	display: flex
	overflow-x: scroll
	scrollbar-width: none
	&::-webkit-scrollbar
		width: 0!important
		height: 0!important

.swiperWrapperFlex
	display: flex
	flex-wrap: nowrap
	height: 100%
	align-items: center
	.imageSwiper
		width: 33px
		min-width: 33px
.aboutRoomAvatar
	font-size: 0.5em

.userwrapper
	border-radius: 50%

.userinfopicwrapper
	padding-bottom: 100%
	position: relative
	background: none
	margin: 0 auto
	border-radius: 50%
	overflow: hidden
	.userwrapper
		width: 50%

.threeAvatars
	.userwrapper

		&:nth-child(1)
			position: absolute
			left: 50%
			top: 0
			transform: translate(-50%, 6.5%)

		&:nth-child(2)
			position: absolute
			right: 0
			bottom: 0
			transform: translate(0, -6.5%)

		&:nth-child(3)
			position: absolute
			left: 0
			bottom: 0
			transform: translate(0, -6.5%)

.twoAvatars

	.userwrapper
		&:first-child
			position: absolute
			top: 0
			left: 0
			transform: translate(6.5%, 6.5%)
		&:last-child
			position: absolute
			right: 0
			bottom: 0
			transform: translate(-6.5%, -6.5%)

.fourAvatars

	.userwrapper

		&:nth-child(1)
			position: absolute
			top: 0
			left: 0

		&:nth-child(2)
			position: absolute
			right: 0
			top: 0

		&:nth-child(3)
			position: absolute
			left: 0
			bottom: 0

		&:nth-child(4)
			position: absolute
			right: 0
			bottom: 0

.fourMore
	background: none
	margin: 0 auto

.imageSwiper
	margin: 0 auto

	img
		display: block
		border-radius: 50%
		width: 100%
		height: 100%
		object-fit: cover

.invited
	opacity: .5

.showmore
	display: flex
	justify-content: center
	font-size: 2em
	padding: $r * 2
</style>
