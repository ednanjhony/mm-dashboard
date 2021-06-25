import { createServer, Factory, Model, ActiveModelSerializer } from 'miragejs';

type FlowIn = {
    id: number;
    date: string;
    price: string;
    material: string;
}

export function makeServerFlow() {
    const server = createServer({
        serializers: {
            application: ActiveModelSerializer,
        },

        models: {
            flowin: Model.extend<Partial<FlowIn>>({})
        },

        factories: {
            flowin: Factory.extend({
                id(i: number) {
                    return `${i + 1}`
                },
                date() {
                    return '01/02/21'
                },
                price() {
                    return 'R$ 700,00'
                },
                material() {
                    return '5 metros de calha'
                },
            })
        },

        seeds(server) {
            server.createList('flowin', 5)
        },

        routes() {
            this.namespace = 'api';

            this.get('flow-total', () => {
                return this.schema.all('flowin')
            });

            this.post('/flow-total');

            this.namespace= '';
            this.passthrough();
        }
    })

    return server;
}