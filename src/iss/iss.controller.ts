import { IssService } from './iss.service';
import { Controller, Get, HttpException } from '@nestjs/common';

@Controller('iss')
export class IssController {
  constructor(private readonly issService: IssService) { }

  @Get('')
  async getIssCountry() {
    try {
      const country = await this.issService.getIssCountry();
      console.log(country);

      return { data: country };
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  @Get('utm')
  async getIssUtm() {
    try {
      const issUtm = await this.issService.getIssUtm();

      return { data: issUtm };
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }
}
