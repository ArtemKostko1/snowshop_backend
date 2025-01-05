import { ApiProperty } from '@nestjs/swagger';

export class BrandResponse {
	@ApiProperty()
	id: number;

	@ApiProperty()
	name: string;
}
