import DataLoader from 'dataloader';

export class DataLoaderWrapper {
    private _function: Function;
    private _loader: DataLoader<any, any>;
    private args: any;
    private context: any;
    private info: any;

    constructor (_function: Function, batch = true, cache = false) {
        this._function = _function;
        this._loader = new DataLoader((keys: string | readonly string[]) => this._wrap(keys), { batch: batch, cache: cache });
        this.args = null;
        this.context = null;
        this.info = null;
    }

    _wrap (keys: string | readonly string[]) {
        return this._function(keys, this.args, this.context, this.info);
    }

    load (key: string, args: any, context: any, info: any) {
        this.args = args;
        this.context = context;
        this.info = info;
        return this._loader.load(key);
    }

    loadMany (keys: readonly any[], args: any, context: any, info: any) {
        this.args = args;
        this.context = context;
        this.info = info;
        return this._loader.loadMany(keys);
    }

    clearAll () {
        this._loader.clearAll();
        this.args = null;
        this.context = null;
        this.info = null;
    }
}
