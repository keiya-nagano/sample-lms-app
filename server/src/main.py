import uvicorn
import controller

if __name__ == "__main__":
    uvicorn.run(controller.app, host="0.0.0.0", port=8000)
