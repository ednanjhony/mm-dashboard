import { ActiveModelSerializer, createServer, Factory, Model } from 'miragejs'

type Bill = {
    id: number;
    name: string;
    price: number;
    date: Date;
}

export function makeServerBills() {
    const server = createServer({
        serializers: {
            application: ActiveModelSerializer,
        },

        models: {
            bill: Model.extend<Partial<Bill>>({})
        },

        factories: {
            bill: Factory.extend({
                id(i: number) {
                    return `${i + 1}`
                },
                name(i: number) {
                    return `Fornecedor ${i + 1}`
                },
                price() {
                    return 2000
                },
                date(i :number) {
                    return `01/${i + 1}/2021`
                },
            })
        },

        seeds(server) {
            server.createList('bill', 5)
        },

        routes() {
            this.namespace = 'api';

            this.get('bills', () => {
                return this.schema.all('bill')
            })

            this.post('/bills')

            this.namespace = '';
            this.passthrough()
        }
    })

    return server;
}