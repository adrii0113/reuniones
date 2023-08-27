import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
// import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'ReunionesWebPartStrings';
// import Reuniones from './components/Reuniones1';
import { IReunionesProps } from './components/IReunionesProps';


// sp imports
import { getSP } from '../../pnp-js-config';
export interface IReunionesWebPartProps {
  description: string;
}


import { GroupFunctions } from './functions/GroupFunctions';
import Reuniones from './front/Reuniones'

export default class ReunionesWebPart extends BaseClientSideWebPart<IReunionesWebPartProps> {

  // private _isDarkTheme: boolean = false;
  // private _environmentMessage: string = '';
  private async _getListData(): Promise<[]>{

    // const _sp = getSP(this.context)

    // console.log(await _sp.web.lists.getByTitle('Sectores')())

    console.log(await GroupFunctions.getAllGroups())
   
  return 


  }
  public render(): void {
    // obtener los ids de las listas que se necesitan y pasarselas al componente como un objeto
    const guids = {grupos:'296e7a8d-7bf8-4173-903d-a6c2c348fa4b', sectores:'676b0dc6-6450-437b-bf04-6b9b5ec1c24a'};
    
    const element: React.ReactElement<IReunionesProps> = React.createElement(
      Reuniones,
      {
        // description: this.properties.description,
        // isDarkTheme: this._isDarkTheme,
        // environmentMessage: this._environmentMessage,
        // hasTeamsContext: !!this.context.sdks.microsoftTeams,
        // userDisplayName: this.context.pageContext.user.displayName,
        context: this.context
      },
      guids
    
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
  //  this._getListData()
    getSP(this.context)
    await this._getListData()
    return this._getEnvironmentMessage().then(message => {
      // this._environmentMessage = message;
    });
   
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              throw new Error('Unknown host');
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  // protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
  //   if (!currentTheme) {
  //     return;
  //   }

  //   this._isDarkTheme = !!currentTheme.isInverted;
  //   const {
  //     semanticColors
  //   } = currentTheme;

  //   if (semanticColors) {
  //     this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
  //     this.domElement.style.setProperty('--link', semanticColors.link || null);
  //     this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
  //   }

  // }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
