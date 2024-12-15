import { useForm } from "react-hook-form";
import { useCreateCar } from "./useCreateCar";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./CreateKitchenware.module.css";

function CreateKitchenware() {
  const { createCar, isCreating } = useCreateCar();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      type: "kitchenware",
    },
  });

  const image = watch("image");

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    createCar({ ...data, image: image }).then(() => {
      queryClient.invalidateQueries("cars");
    });
  };

  // تابع برای فعال کردن input فایل از طریق دکمه
  const handleFileInputClick = () => {
    document.getElementById("image").click();
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.createcar}>
        <div className={styles.formSection}>
          <div className={styles.group}>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              {...register("name", { required: "Car name is required" })}
            />
            {errors.name && (
              <p className={styles.errorMessage}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.group}>
            <label htmlFor="make">Company:</label>
            <input
              id="make"
              {...register("make", { required: "Car make is required" })}
            />
            {errors.make && (
              <p className={styles.errorMessage}>{errors.make.message}</p>
            )}
          </div>

          <div className={styles.group}>
            <label htmlFor="type">Product Type:</label>
            <input
              id="type"
              {...register("type", { required: "Car type is required" })}
              disabled
            />
            {errors.type && (
              <p className={styles.errorMessage}>{errors.type.message}</p>
            )}
          </div>

          <div className={styles.group}>
            <label htmlFor="price">Price:</label>
            <input
              id="price"
              type="number" // تغییر به "number"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true, // به صورت عددی ثبت می‌شود
                min: { value: 0, message: "Price must be a positive number" }, // قیمت باید عدد مثبت باشد
              })}
            />
            {errors.price && (
              <p className={styles.errorMessage}>{errors.price.message}</p>
            )}
          </div>

          <div className={styles.group}>
            <label htmlFor="image">Select Image:</label>
            {/* دکمه Choose Image */}
            <button
              type="button"
              onClick={handleFileInputClick}
              className={styles.fileInputButton}
            >
              Choose Image
            </button>
            <input
              id="image"
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className={styles.fileInput}
            />
            {errors.image && (
              <p className={styles.errorMessage}>{errors.image.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isCreating}
            className={styles.submitBtn}
          >
            {isCreating ? "Creating..." : "Create New Product"}
          </button>
        </div>

        <div className={styles.previewSection}>
          <div className={styles.uploadText}>Upload Product Image</div>
          <div className={styles.imagePreview}>
            {image && image[0] && (
              <img src={URL.createObjectURL(image[0])} alt="Car preview" />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateKitchenware;
