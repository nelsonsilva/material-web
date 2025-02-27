/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// Style preference for leading underscores.
// tslint:disable:strip-private-property-underscore


import {customElement} from 'lit/decorators.js';

import {styles as controlStyle} from './mwc-control-list-item.css';
import {styles} from './mwc-list-item.css';
import {RadioListItemBase} from './mwc-radio-list-item-base';

declare global {
  interface HTMLElementTagNameMap {
    'mwc-radio-list-item': RadioListItem;
  }
}

@customElement('mwc-radio-list-item')
export class RadioListItem extends RadioListItemBase {
  static override styles = [styles, controlStyle];
}
