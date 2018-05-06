	<template>
	<v-layout wrap
	          row>
		<v-flex sm12>
			<v-layout row
			          wrap>
				<v-flex sm2
				        class="mr-3">
					<v-text-field label="Ad"
					              v-model="search.Adi"
					              :disabled="loading"
					              ref="inputAdi"
					              @keyup.enter="getDataFromApi()">
					</v-text-field>
				</v-flex>
				<v-flex sm2>
					<v-text-field label="Soyad"
					              v-model="search.Soyadi"
					              :disabled="loading"
					              ref="inputSoyadi"
					              @keyup.enter="getDataFromApi()">
					</v-text-field>
				</v-flex>
				<v-flex sm2>
					<v-btn :loading="loading"
					       :disabled="loading"
					       @click="getDataFromApi()">
						Search
					</v-btn>
				</v-flex>
			</v-layout>
		</v-flex>
		<v-flex sm12
		        style="height:100%;overflow-x: auto;">
			<v-data-table :headers="headers"
			              :items="results"
			              disable-initial-sort
			              :pagination.sync="pagination"
			              :total-items="totalResults"
			              :loading="loading"
			              class="elevation-1">
				<template slot="items"
				          slot-scope="props">
					<tr @click="onRowClick(props.item)">
						<td>{{ props.item.TCKNO }}</td>
						<td class="text-xs-center">{{ props.item.Adi }}</td>
						<td class="text-xs-center">{{ props.item.Soyadi }}</td>
						<td class="text-xs-center">{{ props.item.AnaAdi }}</td>
						<td class="text-xs-center">{{ props.item.BabaAdi }}</td>
						<td class="text-xs-center">{{ props.item.Cinsiyeti }}</td>
						<td class="text-xs-center">{{ props.item.DogumYeri }}</td>
						<td class="text-xs-center">{{ props.item.DogumTarihi }}</td>
						<td class="text-xs-center">{{ props.item.NufusIl }}</td>
						<td class="text-xs-center">{{ props.item.NufusIlce }}</td>
						<td class="text-xs-center">{{ props.item.AdresIl }}</td>
						<td class="text-xs-center">{{ props.item.AdresIlce }}</td>
						<td class="text-xs-center">{{ props.item.AdresBelde }}</td>
						<td class="text-xs-center">{{ props.item.AdresMuhtarlik }}</td>
						<td class="text-xs-center">{{ props.item.AdresCaddeSokak }}</td>
						<td class="text-xs-center">{{ props.item.KapiNo }}</td>
						<td class="text-xs-center">{{ props.item.DaireNo }}</td>
					</tr>
				</template>
			</v-data-table>
		</v-flex>
	</v-layout>
</template>
<script>
	import AdresService from '@/services/AdresService';
	function format (format, args) {
		return format.replace(/{(\d+)}/g, function (match, number) {
			return typeof args[number] != 'undefined'
				? args[number]
				: match
				;
		});
	}
	export default {
		name: 'DataTable',
		data () {
			return {
				search: {
					Adi: '',
					Soyadi: ''
				},
				totalResults: 0,
				results: [],
				loading: false,
				pagination: {},
				headers: [
					{
						text: 'TCKNO',
						align: 'left',
						sortable: false,
						value: 'TCKNO'
					},
					{ text: 'Adi', sortable: false, align: 'center', value: 'Adi' },
					{ text: 'Soyadi', sortable: false, align: 'center', value: 'Soyadi' },
					{ text: 'AnaAdi', sortable: false, align: 'center', value: 'AnaAdi' },
					{ text: 'BabaAdi', sortable: false, align: 'center', value: 'BabaAdi' },
					{ text: 'Cinsiyeti', sortable: false, align: 'center', value: 'Cinsiyeti' },
					{ text: 'DogumYeri', sortable: false, align: 'center', value: 'DogumYeri' },
					{ text: 'DogumTarihi', sortable: false, align: 'center', value: 'DogumTarihi' },
					{ text: 'NufusIl', sortable: false, align: 'center', value: 'NufusIl' },
					{ text: 'NufusIlce', sortable: false, align: 'center', value: 'NufusIlce' },
					{ text: 'AdresIl', sortable: false, align: 'center', value: 'AdresIl' },
					{ text: 'AdresIlce', sortable: false, align: 'center', value: 'AdresIlce' },
					{ text: 'AdresBelde', sortable: false, align: 'center', value: 'AdresBelde' },
					{ text: 'AdresMuhtarlik', sortable: false, align: 'center', value: 'AdresMuhtarlik' },
					{ text: 'AdresCaddeSokak', sortable: false, align: 'center', value: 'AdresCaddeSokak' },
					{ text: 'KapiNo', sortable: false, align: 'center', value: 'KapiNo' },
					{ text: 'DaireNo', sortable: false, align: 'center', value: 'DaireNo' }
				]
			}
		},
		mounted: function () {
			this.$refs.inputAdi.focus();
		},
		watch: {
			pagination: {
				handler () {
					this.getDataFromApi(this.limit, this.skip);
				},
				deep: true
			}
		},
		methods: {
			async getDataFromApi (limit, skip) {
				this.loading = true;
				var body = {
					query: {},
					limit: limit || this.limit,
					skip: skip || this.skip
				};
				if (this.search.Adi !== '') {
					body.query.Adi = this.search.Adi;
				}
				if (this.search.Soyadi !== '') {
					body.query.Soyadi = this.search.Soyadi;
				}
				var response = await AdresService.getWithFilter(body);
				if (response) {
					this.results = response.result;
					this.totalResults = response.total;
				}
				this.loading = false;
			},
			onRowClick (item) {
				var html = `
				<div class="kisi-wrapper">
					<div class="key-value-wrapper"><span class="kisi-keys">TCKNO</span>			 <span class="kisi-value">{0}</span></div>
					<div class="key-value-wrapper"><span class="kisi-keys">Adi</span>				 <span class="kisi-value">{1}</span></div>
					<div class="key-value-wrapper"><span class="kisi-keys">Soyadi</span>			 <span class="kisi-value">{2}</span></div>
					<div class="key-value-wrapper"><span class="kisi-keys">AnaAdi</span>			 <span class="kisi-value">{3}</span></div>
					<div class="key-value-wrapper"><span class="kisi-keys">BabaAdi</span>			 <span class="kisi-value">{4}</span></div>
					<div class="key-value-wrapper"><span class="kisi-keys">Cinsiyeti</span>		 <span class="kisi-value">{5}</span></div>
					<div class="key-value-wrapper"><span class="kisi-keys">DogumYeri</span>		 <span class="kisi-value">{6}</span></div>
					<div class="key-value-wrapper"><span class="kisi-keys">DogumTarihi</span>		 <span class="kisi-value">{7}</span></div>
					<div class="key-value-wrapper"><span class="kisi-keys">NufusIl</span>			 <span class="kisi-value">{8}</span></div>
					<div class="key-value-wrapper"><span class="kisi-keys">NufusIlce</span>		 <span class="kisi-value">{9}</span></div>
					<div class="key-value-wrapper"><span class="kisi-keys">AdresIl</span>			 <span class="kisi-value">{10}</span></div>
					<div class="key-value-wrapper"><span class="kisi-keys">AdresIlce</span>		 <span class="kisi-value">{11}</span></div>
					<div class="key-value-wrapper"><span class="kisi-keys">AdresBelde</span>		 <span class="kisi-value">{12}</span></div>
					<div class="key-value-wrapper"><span class="kisi-keys">AdresMuhtarlik</span>	 <span class="kisi-value">{13}</span></div>
					<div class="key-value-wrapper"><span class="kisi-keys">AdresCaddeSokak</span>	 <span class="kisi-value">{14}</span></div>
					<div class="key-value-wrapper"><span class="kisi-keys">KapiNo</span>			 <span class="kisi-value">{15}</span></div>
					<div class="key-value-wrapper"><span class="kisi-keys">DaireNo</span>			 <span class="kisi-value">{16}</span></div>
				</div>
				`;
				var args = [];
				for (let i in item) {
					args.push(item[i]);
				}
				html = format(html, args);
				this.$swal({
					html: html
				})
			}
		},
		computed: {
			limit: function () {
				return this.pagination.rowsPerPage === -1 ? undefined : this.pagination.rowsPerPage;
			},
			skip: function () {
				if (this.pagination.page && this.pagination.rowsPerPage) {
					return (this.pagination.page - 1) * this.pagination.rowsPerPage;
				} else {
					return 0;
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.kisi-wrapper {
	  display: block;
	  float: left;
	}
	.kisi-keys,
	.kisi-value {
	  text-align: left;
	  width: 50%;
	  display: block;
	  /* height: 20px; */
	}
	.key-value-wrapper {
	  border-bottom: 1px solid silver;
	  padding: 5px 0px;
	  float: left;
	  width: 100%;
	  display: block;
	}
	.kisi-keys::after,
	.kisi-value::after {
	  content: "|";
	  color: transparent;
	}
	.kisi-keys {
	  float: left;
	  font-weight: bold;
	}
	.kisi-value {
	  float: right;
	}
</style>
