/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import {html, LitElement, TemplateResult} from 'lit';
import {eventOptions, property, query, queryAsync, state} from 'lit/decorators.js';
import {ifDefined} from 'lit/directives/if-defined.js';

import {ariaProperty} from '../../decorators/aria-property';
import {Ripple} from '../../ripple/mwc-ripple';
import {RippleHandlers} from '../../ripple/ripple-handlers';
import {ARIAHasPopup} from '../../types/aria';

/** @soyCompatible */
export class IconButton extends LitElement {
  @property({type: Boolean, reflect: true}) disabled = false;

  @property({type: String}) icon = '';

  /** @soyPrefixAttribute */
  @ariaProperty
  @property({type: String, attribute: 'aria-label'})
  override ariaLabel!: string;

  /** @soyPrefixAttribute */
  @ariaProperty
  @property({type: String, attribute: 'aria-haspopup'})
  override ariaHasPopup!: ARIAHasPopup;

  @query('button') buttonElement!: HTMLElement;

  @queryAsync('md-ripple') ripple!: Promise<Ripple|null>;

  @state() protected shouldRenderRipple = false;

  protected rippleHandlers: RippleHandlers = new RippleHandlers(() => {
    this.shouldRenderRipple = true;
    return this.ripple;
  });

  /** @soyTemplate */
  protected renderRipple(): TemplateResult|string {
    return this.shouldRenderRipple ? html`
            <md-ripple
                .disabled="${this.disabled}"
                unbounded>
            </md-ripple>` :
                                     '';
  }

  override focus() {
    const buttonElement = this.buttonElement;
    if (buttonElement) {
      this.rippleHandlers.startFocus();
      buttonElement.focus();
    }
  }

  override blur() {
    const buttonElement = this.buttonElement;
    if (buttonElement) {
      this.rippleHandlers.endFocus();
      buttonElement.blur();
    }
  }

  /** @soyTemplate */
  protected override render(): TemplateResult {
    return html`<button
        class="md3-icon-button"
        aria-label="${ifDefined(this.ariaLabel)}"
        aria-haspopup="${ifDefined(this.ariaHasPopup)}"
        ?disabled="${this.disabled}"
        @focus="${this.handleRippleFocus}"
        @blur="${this.handleRippleBlur}"
        @mousedown="${this.handleRippleMouseDown}"
        @mouseenter="${this.handleRippleMouseEnter}"
        @mouseleave="${this.handleRippleMouseLeave}"
        @touchstart="${this.handleRippleTouchStart}"
        @touchend="${this.handleRippleDeactivate}"
        @touchcancel="${this.handleRippleDeactivate}"
    >${this.renderRipple()}
    ${this.renderIcon()}${this.renderTouchTarget()}<span><slot></slot></span>
  </button>`;
  }

  /** @soyTemplate */
  protected renderIcon(): TemplateResult|string {
    return this.icon ? html`<i class="material-icons">${this.icon}</i>` : '';
  }

  /** @soyTemplate */
  protected renderTouchTarget(): TemplateResult {
    return html`<span class="md3-icon-button__touch"></span>`;
  }

  @eventOptions({passive: true})
  protected handleRippleMouseDown(event?: Event) {
    const onUp = () => {
      window.removeEventListener('mouseup', onUp);

      this.handleRippleDeactivate();
    };

    window.addEventListener('mouseup', onUp);
    this.rippleHandlers.startPress(event);
  }

  @eventOptions({passive: true})
  protected handleRippleTouchStart(event?: Event) {
    this.rippleHandlers.startPress(event);
  }

  protected handleRippleDeactivate() {
    this.rippleHandlers.endPress();
  }

  protected handleRippleMouseEnter() {
    this.rippleHandlers.startHover();
  }

  protected handleRippleMouseLeave() {
    this.rippleHandlers.endHover();
  }

  protected handleRippleFocus() {
    this.rippleHandlers.startFocus();
  }

  protected handleRippleBlur() {
    this.rippleHandlers.endFocus();
  }
}
