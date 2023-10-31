import {Component, OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/services/data-storage.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {AuthService} from '../auth/auth.service';
import {User} from "../../shared/models/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
@UntilDestroy()
export class HeaderComponent implements OnInit {
  public isAuthenticated = false;
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
  ) {}

  public ngOnInit(): void {
    this.authService.user$.pipe(untilDestroyed(this)).subscribe((user: User) => {
      this.isAuthenticated = !!user;
    });
  }

  public onLogout(): void {
    this.authService.logout();
  }

  public onSaveData(): void {
    this.dataStorageService.storeRecipes();
  }

  public onFetchData(): void {
    this.dataStorageService.fetchRecipes().pipe(untilDestroyed(this)).subscribe();
  }
}
