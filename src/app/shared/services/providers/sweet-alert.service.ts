import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {
  constructor(private translate: TranslateService) { }

  deleteConfirmation()
  {
    const sweetAlertMessage =  this.translate.instant('common.sweetAlert');
    return Swal.fire({
      title: sweetAlertMessage?.title,
      text: sweetAlertMessage?.text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4dbd74',
      cancelButtonColor: '#f86c6b',
      confirmButtonText: `<i class="fa fa-check" aria-hidden="true"></i> ${sweetAlertMessage?.confirmButtonText}`,
      cancelButtonText: `<i class="fa fa-times" aria-hidden="true"></i> ${sweetAlertMessage?.cancelButtonText}`
    });

  }

}
