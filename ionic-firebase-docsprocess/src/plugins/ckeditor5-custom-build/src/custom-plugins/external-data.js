
import { Command, Plugin } from '@ckeditor/ckeditor5-core';
import { ButtonView } from '@ckeditor/ckeditor5-ui/src';
import { Widget, toWidget } from '@ckeditor/ckeditor5-widget';
import  './style.css';

export class ExternalDataWidgetCommand extends Command {
    execute(params) {
        console.log('params ==>',params);
        const editor = this.editor;
        const selection = editor.model.document.selection;
        const field = params;
        editor.model.change( writer => {
            const externalWidget = writer.createElement(
                'externalElement', {
                    ...Object.fromEntries( selection.getAttributes() ),
                    'data-resource-url': field.path,
                    'field-name': field.field.name,
                    'name': 'external-data',
                    'value': field.field.value,
                }
            );

            editor.model.insertObject( externalWidget, null, null, {
                setSelection: 'on'
            } );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;

        const isAllowed = model.schema.checkChild( selection.focus.parent, 'externalElement' );

        this.isEnabled = isAllowed;
    }
}

export class ExternalDataWidget extends Plugin {
    static get requires() {
        return [ ExternalDataWidgetEditing, ExternalDataWidgetUI ];
    }
}

export class ExternalDataWidgetUI extends Plugin {
    init() {
        const editor = this.editor;
        const externalWidgetCommand = editor.commands.get( 'external' );

        editor.ui.componentFactory.add( 'external', locale => {
            const button = new ButtonView( locale );

            // button.set( {
            //     label: 'Inserir campo',
            //     tooltip: true,
            //     withText: true,
            //     icon: false
            // } );

            // button.bind( 'isEnabled' ).to( externalWidgetCommand );

            // button.on( 'execute', () => {
            //     editor.execute( 'external' );
            //     editor.editing.view.focus();
            // } );

            // return button;
        } );
    }
}

export class ExternalDataWidgetEditing extends Plugin {
    constructor( editor ) {
        super( editor );

        //this.intervalId = this._intervalFetch();

        this.externalDataValue = '';
    }

    static get requires() {
        return [ Widget ];
    }

    destroy() {
        clearInterval( this.intervalId );
    }

    init() {
        this._defineSchema();
        this._defineConverters();
        //this._updateWidgetData();

        this.editor.commands.add( 'external', new ExternalDataWidgetCommand( this.editor ) );
    }

    _intervalFetch() {
        return setInterval( () => this._updateWidgetData(), 10000 ); // set time interval to 10s
    }

    async _updateWidgetData( externalUrl = RESOURCE_URL ) {
        try {
            
            const response = await fetch( externalUrl );
            const data = await response.json();

            const updateTime = new Date( data.closeTime );
            const parsedData = '$' + Number( data.lastPrice ).toFixed( 2 ) + ' - ' + updateTime.toLocaleString();

            this.externalDataValue = parsedData;

            const rootElement = this.editor.model.document.getRoot();

            for ( const { item } of this.editor.model.createRangeIn( rootElement ) ) {
                if ( item.is( 'element', 'externalElement' ) ) {
                    this.editor.editing.reconvertItem( item );
                }
            }
        } catch ( error ) {
            console.error( error );
        }
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'externalElement', {
            inheritAllFrom: '$inlineObject',
            allowAttributes: [ 'data-resource-url','name', 'value', 'field-name']
        } );
    }

    _defineConverters() {
        const editor = this.editor;

        editor.conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'span',
                attributes: [ 'data-resource-url','name','value' ]
            },
            model: ( viewElement, { writer } ) => {
                const externalUrl = viewElement.getAttribute( 'data-resource-url' );
                const name = viewElement.getAttribute( 'name' );
                const fieldName = viewElement.getAttribute( 'field-name' );
                const value = viewElement.getAttribute( 'value' );

                return writer.createElement( 'externalElement', {
                    'data-resource-url': externalUrl,
                    'name': name,
                    'value': value,
                    'field-name': fieldName,
                } );
            }
        } );

        editor.conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'externalElement',
            view: ( modelElement, { writer } ) => {
                return writer.createEmptyElement( 'span', {
                    'data-resource-url': modelElement.getAttribute( 'data-resource-url' ),
                    'name': modelElement.getAttribute( 'name' ),
                    'value': modelElement.getAttribute( 'value' ),
                    'field-name': modelElement.getAttribute( 'field-name' )
                } );
            }
        } );

        editor.conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'externalElement',
            view: ( modelElement, { writer } ) => {
                const externalValueToShow = modelElement.getAttribute( 'value' );

                const externalDataPreviewElement = writer.createRawElement( 'span', null, function( domElement ) {
                    domElement.classList.add( externalValueToShow ? 'external-data-widget' : 'external-data-widget-error' );
                    domElement.textContent = externalValueToShow || 'Aguardando dados...';

                    if ( externalValueToShow ) {
                        domElement.classList.add( 'external-data-widget-bounce' );
                        setTimeout( () => domElement.classList.remove( 'external-data-widget-bounce' ), 1100 );
                    }
                } );

                const externalWidgetContainer = writer.createContainerElement( 'span', null, externalDataPreviewElement );

                return toWidget( externalWidgetContainer, writer, {
                    label: 'External widget'
                } );
            }
        } );
    }
}

