import { ActiveModelSerializer, createServer, Factory, Model } from 'miragejs'

type Supplier = { 
    id: number;
    name: string;
    material: string;
    tel: string;
 }

export function makeServerSuppliers() {
    const server = createServer({
        serializers: {
            application: ActiveModelSerializer,
        },

        models: {
            supplier: Model.extend<Partial<Supplier>>({})
        },

        factories: {
            supplier: Factory.extend({
                id(i: number) {
                    return `${i + 1}`
                },
                name(i: number) {
                    return `User ${i + 1}`
                },
                material() {
                    return "Tinta"
                },
                tel() {
                    return '4512-2013'
                },
            })
        },

        seeds(server) {
            server.createList('supplier', 5)
        },

        routes() {
            this.namespace = 'api';
            
            this.get('suppliers', () => {
                return this.schema.all('supplier')
            })

            this.post('/suppliers')

            this.namespace = '';
            this.passthrough()
        }
    })

    return server;
}