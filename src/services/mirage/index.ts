import { ActiveModelSerializer, createServer, Factory, Model } from 'miragejs'
import faker from 'faker'

type Order = { 
    name: string;
    address: string;
    tel: string;
    date: string;
    hour: string;
    situation: string;
    description: string;
 }

export function makeServer() {
    const server = createServer({
        serializers: {
            application: ActiveModelSerializer,
        },

        models: {
            order: Model.extend<Partial<Order>>({})
        },

        factories: {
            order: Factory.extend({
                name(i: number) {
                    return `User ${i + 1}`
                },
                address() {
                    return 'Estrada dos louco'
                },
                tel() {
                    return '4512-2013'
                },
                date() {
                    return faker.date.recent(10);
                },
                hour() {
                    return '12:00'
                },
                situation() {
                    return 'Pendente'
                },
                description() {
                    return 'Até quinta'
                },
            })
        },

        seeds(server) {
            server.createList('order', 5)
        },

        routes() {
            this.namespace = 'api';
            
            this.get('orders', () => {
                return this.schema.all('order')
            })

            this.post('/orders')

            this.namespace = '';
            this.passthrough()
        }
    })

    return server;
}