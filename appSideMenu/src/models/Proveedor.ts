/** Modelo para la clase Proveedor */
export class Proveedor {

    private id: number;
    private nombre: string;
    private numero: string;
    private disponible: boolean;

    constructor(data?: any) {
        if (data !== undefined) {
            this.$id = data._id;
            this.$nombre = data._nombre;
            this.$numero = data._numero;
            this.$disponible = data._disponible;
        }
    }

    /** Getters y setters */
    public get $id(): number {
        return this.id;
    }

    public set $id(value: number) {
        this.id = value;
    }

    public get $nombre(): string {
        return this.nombre;
    }

    public set $nombre(value: string) {
        this.nombre = value;
    }

    public get $numero(): string {
        return this.numero;
    }

    public set $numero(value: string) {
        this.numero = value;
    }

    public get $disponible(): boolean {
        return this.disponible;
    }

    public set $disponible(value: boolean) {
        this.disponible = value;
    }
}
