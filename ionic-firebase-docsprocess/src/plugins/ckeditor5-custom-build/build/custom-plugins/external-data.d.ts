export class ExternalDataWidgetCommand extends Command {
    execute(params: any): void;
}
export class ExternalDataWidget extends Plugin {
    static get requires(): (typeof ExternalDataWidgetUI)[];
}
export class ExternalDataWidgetUI extends Plugin {
    init(): void;
}
export class ExternalDataWidgetEditing extends Plugin {
    static get requires(): (typeof Widget)[];
    constructor(editor: any);
    externalDataValue: string;
    init(): void;
    _intervalFetch(): number;
    _updateWidgetData(externalUrl?: any): Promise<void>;
    _defineSchema(): void;
    _defineConverters(): void;
}
import { Command } from "@ckeditor/ckeditor5-core";
import { Plugin } from "@ckeditor/ckeditor5-core";
import { Widget } from "@ckeditor/ckeditor5-widget";
