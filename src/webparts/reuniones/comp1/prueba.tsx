import * as React from "react";
// import { TaxonomyPicker } from "@pnp/spfx-controls-react/lib/TaxonomyPicker";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPnPTaxonomyPickerProps {
  description: string;
  context: WebPartContext;
}

export default class PnPTaxonomyPicker extends React.Component<IPnPTaxonomyPickerProps, {}> {
  public render(): React.ReactElement<IPnPTaxonomyPickerProps> {
    // const { context } = this.props;

    return (
      <div>
        <div>
          <div>
            <div>
              <span>Welcome to SharePoint!</span>
              <p>Customize SharePoint experiences using Web Parts.</p>

              {/* <TaxonomyPicker
                allowMultipleSelections={true}
                termsetNameOrID="Countries"
                panelTitle="Select Term"
                label="Taxonomy Picker"
                context={this.props.context}
                // onChange={this.onTaxPickerChange}
                isTermSetSelectable={false}
              /> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
