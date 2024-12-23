import { useForm } from "react-hook-form";
import { useCreateCar } from "./useCreateCar";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./CreateMobile.module.css";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function CreateMobile({ onClose }) {
  const { createCar, isCreating } = useCreateCar();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      type: "mobiles",
    },
  });

  const image = watch("image");

  const onSubmit = async (data) => {
    try {
      const image = typeof data.image === "string" ? data.image : data.image[0];
      await createCar({ ...data, image: image });
      await queryClient.invalidateQueries("cars");
      toast.success("Product created successfully!");
      if (onClose) onClose();
    } catch (error) {
      toast.error("Failed to create product");
      console.error("Error creating product:", error);
    }
  };

  const handleFileInputClick = () => {
    document.getElementById("image").click();
  };

  return (
    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
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
            <label htmlFor="model">Model:</label>
            <input
              id="model"
              {...register("model", { required: "Car model is required" })}
            />
            {errors.model && (
              <p className={styles.errorMessage}>{errors.model.message}</p>
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
              type="number"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
                min: { value: 0, message: "Price must be a positive number" },
              })}
            />
            {errors.price && (
              <p className={styles.errorMessage}>{errors.price.message}</p>
            )}
          </div>

          <div className={styles.group}>
            <label htmlFor="image">Select Image:</label>
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

CreateMobile.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default CreateMobile;
