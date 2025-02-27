/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {html, TemplateResult} from 'lit';
import {ClassInfo} from 'lit/directives/class-map';

import {FabShared} from './fab-shared';

/**
 * Fab Extended Base class logic and template definition
 * @soyCompatible
 */
export class FabExtended extends FabShared {
  /** @soyTemplate */
  protected override getRootClasses(): ClassInfo {
    return {
      ...super.getRootClasses(),
      'md3-fab--extended': true,
    };
  }

  /** @soyTemplate */
  protected override renderLabel(): TemplateResult {
    return html`<span class="md3-fab__label">${this.label}</span>`;
  }
}
