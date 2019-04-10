/**
 * Base component Class
 */
export class BaseComponent {
  alertMessage: string = "";
  alertSuccess: boolean = false;

  /**
   * Hides alert
   */
  public hideAlert(): void {
    this.alertMessage = "";
  }

  /**
   * Shows success alert
   * @param message
   */
  public showSuccessAlert(message: string): void {
    this.showAlert(message, true);
  }

  /**
   * Shows error alert
   * @param message
   */
  public showErrorAlert(message: string): void {
    this.showAlert(message, false);
  }

  /**
   * Shows alert
   * @param message
   * @param success
   */
  private showAlert(message: string, success: boolean): void {
    this.alertMessage = message;
    this.alertSuccess = success;
  }
}
