<template>
	<v-app>
		<v-content id="main-content-wrapper">
			<v-container fluid
			             id="app-container"
			             fill-height>
				<router-view></router-view>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
	export default {
		name: 'App',
		data () {
			return {

			}
		}
	}
</script>
