import { NumberField, StringField, StringFieldOptional } from "src/common/decorators/field.decorator";

export class CreateProductPhotoDto {
	@StringFieldOptional()
	url?: string;
}
